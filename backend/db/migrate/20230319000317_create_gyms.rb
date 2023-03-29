class CreateGyms < ActiveRecord::Migration[7.0]
  def change
    create_table :gyms do |t|
      t.string :gym_name
      t.text :address
      t.integer :gym_phone_number
      t.string :general_hours
      t.text :parking_tips
      t.string :membership_fees

      t.timestamps
    end
  end
end
