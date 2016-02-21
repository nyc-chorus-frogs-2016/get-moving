class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.string :user_email, null: false
      t.datetime :start_time, null: false
      t.datetime :departure_time, null: false

      t.timestamps null: false
    end
  end
end

