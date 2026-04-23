class Profile < ApplicationRecord
  belongs_to :user
  has_one :book, through: :user
end
