class ConvertDatabaseToUtf8mb4 < ActiveRecord::Migration
  def change
    execute "ALTER TABLE posts CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin"
  end
end