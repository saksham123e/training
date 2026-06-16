class CsvImportJob < ApplicationJob
  queue_as :default

  def perform(import_id, file_content)
    import = Import.find(import_id)
    CsvImportService.new(import, file_content).call
  end
end
