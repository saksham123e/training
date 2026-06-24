class DashboardMetricsService
  def initialize(report_executions = ReportExecution.all)
    @report_executions = report_executions
  end

  def call
    total_count = @report_executions.count
    completed_count = @report_executions.completed.count

    {
      total_reports: completed_count,
      failed_reports: @report_executions.failed.count,
      success_rate: total_count.positive? ? ((completed_count.to_f / total_count) * 100).round(2) : 0,
      average_processing_time: @report_executions.average(:execution_time).to_f.round(2),
      last_report: @report_executions.order(executed_at: :desc).first
    }
  end
end