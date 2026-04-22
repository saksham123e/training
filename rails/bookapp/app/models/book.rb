class Book < ApplicationRecord
  validates :title, presence: true
  validates :author, presence: true
  validates :price, presence: true, numericality: { greater_than: 0 }

  before_save :capitalize_title

  private

  def capitalize_title
    self.title = title.split.map(&:capitalize).join(" ")
  end

  before_validation :set_default_author

  def set_default_author
    self.author = "Unknown" if author.blank?
  end
end
