class Customer < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

  validates :first_name, presence: true

  validates :phone,
            format: {
              with: /\A\d{10}\z/,
              message: "must be 10 digits"
            },
            allow_blank: true
end
