# API Observation Via Codespace URL
# API Observation Via Hopscotch
# API Observation Via CURL

# A. Get User Details
curl -X GET "https://improved-xylophone-5gjvv4q7p54v275vv-8000.app.github.dev/users"

# B. Create/Save User Details
curl -X POST "https://improved-xylophone-5gjvv4q7p54v275vv-8000.app.github.dev/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Aayusmita Patro",
    "age": 20,
    "height": 160,
    "weight": 60,
    "gender": "Female"
  }'

# # C. Update User Details

curl -X PUT "https://improved-xylophone-5gjvv4q7p54v275vv-8000.app.github.dev/users/1" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Aayusmita Updated",
    "age": 20,
    "height": 160,
    "weight": 58,
    "gender": "Female"
  }'


# # D. Delete User Details
curl -X DELETE "https://improved-xylophone-5gjvv4q7p54v275vv-8000.app.github.dev/users/1"



# A. Get All User Activities
curl -X GET "https://improved-xylophone-5gjvv4q7p54v275vv-8000.app.github.dev/activities"


# # B. Create / Save User Activity
curl -X POST "https://improved-xylophone-5gjvv4q7p54v275vv-8000.app.github.dev/activities" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "steps": 7500,
    "water_intake": 2.5,
    "calories_burned": 420
  }'


# # C. Update User Activity
curl -X PUT "https://improved-xylophone-5gjvv4q7p54v275vv-8000.app.github.dev/activities/1" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "steps": 9000,
    "water_intake": 3.0,
    "calories_burned": 500
  }'


# # D. Delete User Activity
curl -X DELETE "https://improved-xylophone-5gjvv4q7p54v275vv-8000.app.github.dev/activities/1"




# # DB Observation Via SQLite Web
# # - install https://github.com/coleifer/sqlite-web
# # - pip install sqlite-web
# # - sqlite_web health_tracker.db
