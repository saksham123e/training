class Admin::ReportExecutionsController < ApplicationController
  def show
    @report_execution = ReportExecution.find(params[:id])
  end
end
