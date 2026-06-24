class CreateReportExecutions < ActiveRecord::Migration[8.1]
  def change
    create_table :report_executions do |t|
      t.string :report_name
      t.integer :status
      t.integer :records_processed
      t.integer :execution_time
      t.text :error_message
      t.datetime :executed_at

      t.timestamps
    end
  end
end
