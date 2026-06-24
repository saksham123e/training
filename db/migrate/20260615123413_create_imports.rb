class CreateImports < ActiveRecord::Migration[8.1]
  def change
    create_table :imports do |t|
      t.string :file_name
      t.string :status
      t.integer :total_rows
      t.integer :successful_rows
      t.integer :failed_rows
      t.integer :processed_rows
      t.text :error_summary
      t.datetime :started_at
      t.datetime :completed_at

      t.timestamps
    end
  end
end
