require "csv"

class CsvImportService
  REQUIRED_COLUMNS = %w[email first_name last_name phone]

  def initialize(import, file_content)
    @import = import
    @file_content = file_content
    @errors = []
    @seen_emails = {}
  end

  def call
    @import.update!(status: "processing", started_at: Time.current)

    rows = CSV.parse(@file_content, headers: true)
    @import.update!(total_rows: rows.size)

    validate_columns!(rows.headers)

    rows.each_with_index do |row, index|
      process_row(row, index + 2)
      @import.update!(processed_rows: index + 1)
    end

    @import.update!(
      status: "completed",
      error_summary: @errors.to_json,
      completed_at: Time.current
    )
  rescue => e
    @import.update!(
      status: "failed",
      error_summary: e.message,
      completed_at: Time.current
    )
  end

  private

  def validate_columns!(headers)
    missing = REQUIRED_COLUMNS - headers

    if missing.any?
      raise "Missing required columns: #{missing.join(', ')}"
    end
  end

  def process_row(row, row_number)
    email = row["email"].to_s.strip
    first_name = row["first_name"].to_s.strip
    last_name = row["last_name"].to_s.strip
    phone = row["phone"].to_s.strip

    errors = []

    errors << "Email is missing" if email.blank?
    errors << "First name is missing" if first_name.blank?
    errors << "Invalid email" unless email.match?(URI::MailTo::EMAIL_REGEXP)
    errors << "Invalid phone number" if phone.present? && !phone.match?(/\A\d{10}\z/)
    errors << "Duplicate email in CSV" if @seen_emails[email]
    errors << "Email already exists" if Customer.exists?(email: email)

    @seen_emails[email] = true

    if errors.any?
      @errors << {
        row: row_number,
        email: email,
        error: errors.join(", ")
      }

      @import.increment!(:failed_rows)
      return
    end

    Customer.create!(
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone: phone
    )

    @import.increment!(:successful_rows)
  end
end
