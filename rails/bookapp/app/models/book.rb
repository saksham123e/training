class Book < ApplicationRecord
  validates :title, presence: true
  validates :author, presence: true
  validates :price, presence: true, numericality: { greater_than: 0 }

  before_save :capitalize_title

  private

  def capitalize_title
    self.title = title.split.map(&:capitalize).join(" ")
  end
end
