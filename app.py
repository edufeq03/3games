# app.py
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class Ranking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    position = db.Column(db.String(100), nullable=False)
    store = db.Column(db.String(3), nullable=False)
    game = db.Column(db.String(100), nullable=False)
    score = db.Column(db.Integer, nullable=False)

@app.route('/')
def menu():
    return render_template('menu.html')

@app.route('/moving_image_game')
def moving_image_game():
    return render_template('moving_image_game.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/genius')
def genius():
    return render_template('genius.html')

@app.route('/game_over', methods=['GET', 'POST'])
def game_over():
    if request.method == 'POST':
        name = request.form['name']
        position = request.form['position']
        store = request.form['store']
        game = request.form['game']
        score = request.form['score']
        new_entry = Ranking(name=name, position=position, store=store, game=game, score=score)
        db.session.add(new_entry)
        db.session.commit()
        return redirect(url_for('ranking'))
    score = request.args.get('score', 0)
    game = request.args.get('game', 'Unknown')
    return render_template('game_over.html', score=score, game=game)

@app.route('/ranking')
def ranking():
    rankings = Ranking.query.order_by(Ranking.score.desc()).all()
    return render_template('ranking.html', rankings=rankings)

if __name__ == '__main__':
    db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
