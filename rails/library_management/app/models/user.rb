class User < ApplicationRecord
  has_many :issues
  has_many :books, through: :issues
end