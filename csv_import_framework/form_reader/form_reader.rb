require 'nokogiri'
require 'open-uri'

print "Enter website URL: "
url = gets.chomp

begin
  html = URI.open(url).read
  doc = Nokogiri::HTML(html)

  forms = doc.css("form")

  puts "\nTotal forms found: #{forms.length}"

  if forms.empty?
    puts "No forms found on this webpage."
  end

  forms.each_with_index do |form, index|
    puts "\n========================"
    puts "Form #{index + 1}"
    puts "========================"

    puts "Action: #{form['action'] || 'Not given'}"
    puts "Method: #{form['method'] || 'get'}"

    puts "\nLabels:"
    labels = form.css("label")
    if labels.empty?
      puts "- No labels found"
    else
      labels.each do |label|
        puts "- #{label.text.strip}"
      end
    end

    puts "\nInput Fields:"
    inputs = form.css("input")
    if inputs.empty?
      puts "- No input fields found"
    else
      inputs.each do |input|
        name = input['name'] || 'no name'
        type = input['type'] || 'text'
        placeholder = input['placeholder'] || 'no placeholder'
        required = input['required'] ? 'Yes' : 'No'

        puts "- name: #{name}, type: #{type}, placeholder: #{placeholder}, required: #{required}"
      end
    end

    puts "\nDropdowns:"
    dropdowns = form.css("select")
    if dropdowns.empty?
      puts "- No dropdowns found"
    else
      dropdowns.each do |select|
        puts "- name: #{select['name'] || 'no name'}"

        options = select.css("option")
        options.each do |option|
          puts "  option: #{option.text.strip}"
        end
      end
    end

    puts "\nRadio Buttons:"
    radios = form.css('input[type="radio"]')
    if radios.empty?
      puts "- No radio buttons found"
    else
      radios.each do |radio|
        puts "- name: #{radio['name'] || 'no name'}, value: #{radio['value'] || 'no value'}"
      end
    end

    puts "\nCheckboxes:"
    checkboxes = form.css('input[type="checkbox"]')
    if checkboxes.empty?
      puts "- No checkboxes found"
    else
      checkboxes.each do |checkbox|
        puts "- name: #{checkbox['name'] || 'no name'}, value: #{checkbox['value'] || 'no value'}"
      end
    end

    puts "\nHidden Fields:"
    hidden_fields = form.css('input[type="hidden"]')
    if hidden_fields.empty?
      puts "- No hidden fields found"
    else
      hidden_fields.each do |hidden|
        puts "- name: #{hidden['name'] || 'no name'}, value: #{hidden['value'] || 'no value'}"
      end
    end

    puts "\nRequired Fields:"
    required_fields = form.css("[required]")
    if required_fields.empty?
      puts "- No required fields found"
    else
      required_fields.each do |field|
        puts "- #{field['name'] || field['id'] || 'unnamed field'}"
      end
    end
  end

rescue OpenURI::HTTPError => e
  puts "Website open nahi ho payi. Error: #{e.message}"

rescue SocketError
  puts "Internet issue ya URL galat hai."

rescue StandardError => e
  puts "Something went wrong: #{e.message}"
end