require "test_helper"

class Admin::ReportExecutionsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get admin_report_executions_show_url
    assert_response :success
  end
end
