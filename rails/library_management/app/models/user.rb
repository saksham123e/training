class User < ApplicationRecord
  has_many :issues
  has_many :books, through: :issues

  validates :name, presence: true
  validates :email, presence: true
end
