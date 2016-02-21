class EventsController < ApplicationController

  def create
    event_params = JSON.parse(params.first[0])
    binding.pry
    @event = Event.new(
      name: event_params["name"],
      address: event_params["address"],
      user_email: event_params["user_email"],
      start_time: event_params["start_time"],
      departure_time: event_params["departure_time"]
      )
    if @event.save
      render text: 'Event saved'
    else
      render text: 'Event not saved'
    end
  end

  # def event_params
  #   params.require(:event).permit(:name, :address, :user_email, :start_time, :departure_time)
  # end

end
