class ReportExecution < ApplicationRecord
  enum :status, {
    pending: 0,
    processing: 1,
    completed: 2,
    failed: 3
  }

  validates :report_name, presence: true
  validates :status, presence: true
  validates :records_processed, presence: true
  validates :execution_time, presence: true
  validates :executed_at, presence: true
end
