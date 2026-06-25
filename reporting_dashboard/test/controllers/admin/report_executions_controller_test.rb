require "test_helper"

class Admin::ReportExecutionsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    report_execution = ReportExecution.create!(
      report_name: "Customer Report",
      status: :completed,
      records_processed: 100,
      execution_time: 2,
      executed_at: Time.current
    )

    get admin_report_execution_path(report_execution)

    assert_response :success
  end
end
