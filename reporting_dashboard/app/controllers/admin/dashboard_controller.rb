class Admin::DashboardController < ApplicationController
  require "csv"

  def index
    @report_executions = ReportExecution.all

    if params[:status].present?
      @report_executions = @report_executions.where(status: params[:status])
    end

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

    @executions =
      case params[:sort]
      when "execution_time"
        @executions.order(execution_time: :desc)
      when "records_processed"
        @executions.order(records_processed: :desc)
      else
        @executions.order(executed_at: :desc)
      end

    respond_to do |format|
      format.html do
        @executions = @executions.page(params[:page]).per(10)
      end

      format.csv do
        send_data generate_csv(@executions),
                  filename: "report_executions_#{Date.current}.csv"
      end
    end
  end

  private

  def generate_csv(executions)
    CSV.generate(headers: true) do |csv|
      csv << [ "Report Name", "Status", "Records Processed", "Execution Time", "Error Message", "Executed At" ]

      executions.each do |execution|
        csv << [
          execution.report_name,
          execution.status,
          execution.records_processed,
          execution.execution_time,
          execution.error_message,
          execution.executed_at
        ]
      end
    end
  end
end
