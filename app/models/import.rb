class Import < ApplicationRecord
  STATUSES = %w[pending processing completed failed]

  validates :status, inclusion: { in: STATUSES }

  before_validation :set_default_status, on: :create

  def progress_text
    "#{processed_rows || 0} / #{total_rows || 0}"
  end

  private

  def set_default_status
    self.status ||= "pending"
    self.total_rows ||= 0
    self.successful_rows ||= 0
    self.failed_rows ||= 0
    self.processed_rows ||= 0
  end
end
