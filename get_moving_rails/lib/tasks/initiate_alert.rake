task :alert_apple => :environment do
  event_to_alert = Event.find_by(name: 'Job Interview at Google')
  puts "Send a push notification for '#{event_to_alert.name}' to Apple."
end

task :find_upcoming => :environment do
  event_to_alert = Event.where(:departure_time => (Time.now)..(Time.now + 300)).first
  puts "event is" + (event_to_alert.departure_time - Time.now).to_s + "seconds away"
  puts "Send a push notification for '#{event_to_alert.name}' to Apple."
end

# Find the next upcomgin event
# Event.where("departure_time >= ?", Date.today).order_by("created_at ASC").limit(1)
