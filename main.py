from flask import Flask, render_template, redirect, url_for, request
from flask_bootstrap import Bootstrap
from functools import reduce
from math import pi
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
Bootstrap(app)

# CREATE DATABASE
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# CREATE TABLE
class History(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    forma = db.Column(db.String(10), nullable=False)
    material = db.Column(db.String(15), nullable=False)
    measures = db.Column(db.String(10), nullable=False)
    mm_inch = db.Column(db.String(5), nullable=False)
    result = db.Column(db.String(35), nullable=False)


db.create_all()


@app.route('/',  methods=['GET', 'POST'])
def get_result():
    lista = request.form.getlist('measure')
    good_list = []
    forma = request.form.get('forma')
    material = request.form.get('material')
    mm_inch = request.form.get('mm_inch', 'inch')

    # creating good list
    for i in lista:
        if i == '':
            i = float(0)
        else:
            i = float(i)
        good_list.append(i)

    # get ro
    ro = 0
    if material == 'Alum':
        ro = 2.7
    elif material == 'Stl№45':
        ro = 7.8
    elif material == 'Stless':
        ro = 7.9

    # get V
    v = 0
    if forma == "block":
        v = reduce(lambda x, y: x * y, good_list, 1)
    elif forma == "cylinder":
        v = pi * good_list[0] ** 2 * good_list[1]
    elif forma == "tube":
        v = pi / 4 * (2 * good_list[1] ** 2 - 2 * good_list[0] ** 2) * good_list[2]
    elif forma == "ball":
        v = 4 / 3 * pi * good_list[0] ** 3

    if mm_inch == "mm":
        v = v / 1000
    elif mm_inch == "inch":
        v = v * 16.387064

    # get M
    m = ro * v / 1000  # kg
    m_kg = round(m, 4)
    m_lbs = round(m * 2.2046226218, 4)

    if request.method == 'POST':
        note = History(
            forma=forma.capitalize(),
            material=material,
            measures=', '.join(lista),
            mm_inch=mm_inch,
            result=f'{m_kg} kg / {m_lbs} lbs',
        )
        db.session.add(note)
        db.session.commit()

    notes = db.session.query(History).all()
    return render_template("index.html", result=f'{m_kg} kg / {m_lbs} lbs', notes=notes[-9:])


@app.route("/delete")
def delete():
    note_id = request.args.get('id')
    note = History.query.get(note_id)
    db.session.delete(note)
    db.session.commit()
    return redirect(url_for('get_result'))


@app.route("/delete_all")
def delete_all():
    db.session.query(History).delete()
    db.session.commit()
    return redirect(url_for('get_result'))


if __name__ == "__main__":
    app.run(debug=True)
