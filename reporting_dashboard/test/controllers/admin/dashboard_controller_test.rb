require "test_helper"

class Admin::DashboardControllerTest < ActionDispatch::IntegrationTest
  test "should get dashboard" do
    get admin_dashboard_path
    assert_response :success
  end
end
