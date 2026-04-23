class Book < ApplicationRecord
  belongs_to :user
  has_many :reviews
  has_one :profile
  has_many :reviewers, through: :reviews, source: :user
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

  after_commit :log_after_commit

  def log_after_commit
    puts "Data successfully DB me save ho gaya ✅"
  end
end
