namespace :reports do
  desc "Generate sample report execution data"
  task generate_sample_data: :environment do
    report_names = [
      "Customer Report",
      "Referral Report",
      "Subscriber Report",
      "Campaign Report",
      "Revenue Report"
    ]

    statuses = [ :pending, :processing, :completed, :failed ]

    500.times do
      status = statuses.sample

      ReportExecution.create!(
        report_name: report_names.sample,
        status: status,
        records_processed: rand(100..10_000),
        execution_time: rand(1..20),
        error_message: status == :failed ? "Sample error occurred" : nil,
        executed_at: rand(30.days).seconds.ago
      )
    end

    puts "500 sample report execution records created successfully!"
  end
end
