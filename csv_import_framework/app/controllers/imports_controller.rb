class ImportsController < ApplicationController
  def index
    @imports = Import.order(created_at: :desc)
  end

  def new
  end

  def create
    file = params[:file]

    if file.blank?
      redirect_to new_import_path, alert: "Please upload a CSV file"
      return
    end

    import = Import.create!(
      file_name: file.original_filename,
      status: "pending"
    )

    CsvImportJob.perform_later(import.id, file.read)

    redirect_to import_path(import), notice: "CSV import started"
  end

  def show
    @import = Import.find(params[:id])
  end
end
