class Admin::DashboardController < ApplicationController
  def index
    @report_executions = ReportExecution.all

    @total_reports = @report_executions.completed.count
    @failed_reports = @report_executions.failed.count

    total_count = @report_executions.count
    completed_count = @report_executions.completed.count

    @success_rate = total_count.positive? ? ((completed_count.to_f / total_count) * 100).round(2) : 0
    @average_processing_time = @report_executions.average(:execution_time).to_f.round(2)
    @last_report = @report_executions.order(executed_at: :desc).first

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
