class User < ApplicationRecord
  has_many :reviews
  has_many :books
  has_one :profile
  has_many :reviewed_books, through: :reviews, source: :book
end
