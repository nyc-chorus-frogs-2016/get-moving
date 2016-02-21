class Event < ActiveRecord::Base
  validates :name, presence: true
  validates :address, presence: true
  validates :user_email, presence: true
  validates :start_time, presence: true
  validates :departure_time, presence: true

  def should_alert?
  end


end
