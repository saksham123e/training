class Book < ApplicationRecord
  has_many :issues, dependent: :destroy
  has_many :users, through: :issues

  validates :title, presence: true
  validates :author, presence: true
  validates :price, numericality: true
end
