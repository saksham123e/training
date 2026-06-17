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
    Rails.logger.info "Import started: #{@import.id}"

    @import.update!(
      status: "processing",
      started_at: Time.current
    )

    rows = CSV.parse(@file_content, headers: true)

    validate_headers!(rows.headers)

    @import.update!(total_rows: rows.size)

    rows.each_with_index do |row, index|
      process_row(row, index + 2)
      @import.update!(processed_rows: index + 1)
    end

    @import.update!(
      status: "completed",
      error_summary: generate_error_csv,
      completed_at: Time.current
    )

    Rails.logger.info "Import completed: #{@import.id}"
  rescue => e
    @import.update!(
      status: "failed",
      error_summary: e.message,
      completed_at: Time.current
    )

    Rails.logger.error "Import failed: #{@import.id} - #{e.message}"
  end

  private

  def validate_headers!(headers)
    missing_columns = REQUIRED_COLUMNS - headers

    return if missing_columns.empty?

    raise "Missing required columns: #{missing_columns.join(', ')}"
  end

  def process_row(row, row_number)
    email = row["email"].to_s.strip
    first_name = row["first_name"].to_s.strip
    last_name = row["last_name"].to_s.strip
    phone = row["phone"].to_s.strip

    row_errors = []

    row_errors << "Email is missing" if email.blank?
    row_errors << "First name is missing" if first_name.blank?
    row_errors << "Invalid email" if email.present? && !email.match?(URI::MailTo::EMAIL_REGEXP)
    row_errors << "Invalid phone number" if phone.present? && !phone.match?(/\A\d{10}\z/)
    row_errors << "Duplicate email in CSV" if email.present? && @seen_emails[email]
    row_errors << "Email already exists in database" if email.present? && Customer.exists?(email: email)

    @seen_emails[email] = true if email.present?

    if row_errors.any?
      Rails.logger.warn "Validation failed at row #{row_number}: #{row_errors.join(', ')}"

      @errors << {
        row: row_number,
        email: email,
        error: row_errors.join(", ")
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

  def generate_error_csv
    CSV.generate(headers: true) do |csv|
      csv << %w[row email error]

      @errors.each do |error|
        csv << [ error[:row], error[:email], error[:error] ]
      end
    end
  end
end
