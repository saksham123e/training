require "test_helper"

class ReportExecutionTest < ActiveSupport::TestCase
  test "should not save without report name" do
    report = ReportExecution.new(
      status: :completed,
      records_processed: 100,
      execution_time: 2,
      executed_at: Time.current
    )

    assert_not report.save
  end

  test "should save valid report execution" do
    report = ReportExecution.new(
      report_name: "Customer Report",
      status: :completed,
      records_processed: 100,
      execution_time: 2,
      executed_at: Time.current
    )

    assert report.save
  end
end
