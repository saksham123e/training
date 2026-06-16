require 'nokogiri'
require 'open-uri'

class FormsController < ApplicationController
  def index
  end

  def analyze
    url = params[:url]

    begin
      html = URI.open(url).read
      doc = Nokogiri::HTML(html)

      @url = url
      @forms_data = []

      doc.css("form").each_with_index do |form, index|
        form_info = {
          number: index + 1,
          action: form['action'] || 'Not given',
          method: form['method'] || 'get',
          labels: form.css("label").map { |label| label.text.strip },
          inputs: form.css("input").map do |input|
            {
              name: input['name'] || 'no name',
              type: input['type'] || 'text',
              placeholder: input['placeholder'] || 'no placeholder',
              required: input['required'] ? 'Yes' : 'No'
            }
          end,
          dropdowns: form.css("select").map do |select|
            {
              name: select['name'] || 'no name',
              options: select.css("option").map { |option| option.text.strip }
            }
          end,
          radios: form.css('input[type="radio"]').map do |radio|
            {
              name: radio['name'] || 'no name',
              value: radio['value'] || 'no value'
            }
          end,
          checkboxes: form.css('input[type="checkbox"]').map do |checkbox|
            {
              name: checkbox['name'] || 'no name',
              value: checkbox['value'] || 'no value'
            }
          end,
          hidden_fields: form.css('input[type="hidden"]').map do |hidden|
            {
              name: hidden['name'] || 'no name',
              value: hidden['value'] || 'no value'
            }
          end,
          required_fields: form.css("[required]").map do |field|
            field['name'] || field['id'] || 'unnamed field'
          end
        }

        @forms_data << form_info
      end

    rescue StandardError => e
      @error = e.message
      @forms_data = []
    end
  end
end