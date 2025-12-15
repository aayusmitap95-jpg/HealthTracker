##################### API Observation Via Codespace URL
##################### API Observation Via Hopscotch
##################### API Observation Via CURL

###########################################################
# A. Get User Details
###########################################################
curl -X GET "https://improved-xylophone-5gjvv4q7p54v275vv-8000.app.github.dev/api/user/details"

###########################################################
# B. Create/Save User Details
###########################################################
# curl -X POST "https://improved-xylophone-5gjvv4q7p54v275vv-8000.app.github.dev/api/user/details" \
#   -H "Content-Type: application/json" \
#   -d '{
#     "name": "Aayusmita Patro",
#     "age": 22,
#     "height": 160,
#     "weight": 54,
#     "gender": "Female"
#   }'

# ###########################################################
# # C. Update User Details
# ###########################################################
# curl -X PUT "http://localhost:8000/api/user/details" \
#   -H "Content-Type: application/json" \
#   -d '{
#     "name": "Aayusmita Updated",
#     "age": 23,
#     "height": 160,
#     "weight": 55,
#     "gender": "Female"
#   }'

# ###########################################################
# # D. Delete User Details
# ###########################################################
# curl -X DELETE "http://localhost:8000/api/user/details"

# ###########################################################
# # DB Observation Via SQLite Web
# ###########################################################
# # - install https://github.com/coleifer/sqlite-web
# # - pip install sqlite-web
# # - sqlite_web health_tracker.db
