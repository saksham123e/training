require 'selenium-webdriver'

driver = Selenium::WebDriver.for :chrome

driver.get("https://www.google.com")

search_box = driver.find_element(name: "q")

search_box.send_keys("Ruby on Rails")
search_box.submit

sleep 3

results = driver.find_elements(css: "h3")

puts "\nTop Results:\n"

results.first(5).each_with_index do |result, index|
  puts "#{index + 1}. #{result.text}"
end

sleep 5

driver.quit
