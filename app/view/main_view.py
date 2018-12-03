import json
from flask import Blueprint, request, jsonify, send_from_directory, redirect, render_template

from controller.main_controller import get_all_teams, create_team, get_team, update_team, delete_team

rootRoute = Blueprint('rootRoute', __name__, url_prefix='/')
frontend = Blueprint('frontend', __name__, url_prefix='/app')
teams = Blueprint('teams', __name__, url_prefix='/teams')

##FRONTEND

@rootRoute.route('/')
def rootRouteF():
    return redirect("/app", code=302)

@frontend.route('/<path:path>')
def serve_frontend(path):
    if (path.startswith("static/")):
        return send_from_directory('frontend', path)
    return render_template("page.html", page=path)

@frontend.route('/')
def root():
    return render_template("page.html", page="landing")

	
## GOTOV FRONTEND SAD IDE API


@teams.route('/hello', methods=['GET'])
def hello_world():
    return 'Hello, World!'


@teams.route('/', methods=['GET', 'POST'])
def teams_view():
    if request.method == 'GET':  # get all teams
        all_teams = get_all_teams()

        response_body = [t.to_dict() for t in all_teams]
        return jsonify(response_body), 200

    if request.method == 'POST':  # create a new team
        # mention validation issues
        body = request.json
        created = create_team(body)
        return jsonify(created), 201


@teams.route('/<string:team_uuid>', methods=['GET', 'PUT', 'DELETE'])
def single_team_view(team_uuid):
    if request.method == 'GET':  # get the team
        team = get_team(team_uuid)
        if team is None:
            return jsonify({'error': 'team with unique id {} not found'.format(team_uuid)}), 404

        response_body = team.to_dict()
        return jsonify(response_body), 200

    if request.method == 'PUT':  # update the team
        body = request.json
        updated = update_team(body)
        if updated is None:
            return jsonify({'error': 'team with unique id {} not found'.format(team_uuid)}), 404

        return jsonify(updated), 200

    if request.method == 'DELETE':  # remove the team
        success = delete_team(team_uuid)

        if not success:
            return jsonify({'error': 'team with unique id {} not found'.format(team_uuid)}), 404

        return jsonify({}), 204
