class Admin::DashboardController < ApplicationController
  def index
    @report_executions = ReportExecution.all

    metrics = DashboardMetricsService.new(@report_executions).call

    @total_reports = metrics[:total_reports]
    @failed_reports = metrics[:failed_reports]
    @success_rate = metrics[:success_rate]
    @average_processing_time = metrics[:average_processing_time]
    @last_report = metrics[:last_report]

    @reports_per_day = @report_executions.group_by_day(:executed_at).count
    @status_distribution = @report_executions.group(:status).count
    @report_types = @report_executions.group(:report_name).count
    @avg_processing_time_trend = @report_executions.group_by_day(:executed_at).average(:execution_time)

    @executions = @report_executions

    if params[:search].present?
      @executions = @executions.where("report_name ILIKE ?", "%#{params[:search]}%")
    end

    case params[:sort]
    when "execution_time"
      @executions = @executions.order(execution_time: :desc)
                               .page(params[:page])
                               .per(10)
    when "records_processed"
      @executions = @executions.order(records_processed: :desc)
                               .page(params[:page])
                               .per(10)
    else
      @executions = @executions.order(executed_at: :desc)
                               .page(params[:page])
                               .per(10)
    end
  end
end