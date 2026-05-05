body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f5f7f7;
  text-align: center;
  color: #333;
}

.header {
  padding: 20px;
  background: #fff;
}

.header h1 {
  margin: 0;
  color: #1FB5B5;
}

.tela { display: none; padding: 20px; }
.tela.ativa { display: block; }

.container {
  position: relative;
  width: 260px;
  margin: 25px auto;
}

.area {
  width: 260px;
  height: 260px;
  border: 2px dashed #ccc;
  border-radius: 12px;
  position: relative;
  background: #fff;
}

/* DISCO */
.circulo {
  width: 120px;
  height: 120px;
  background: #1FB5B5;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.1s;
}

/* FEEDBACK */
.perfeito {
  background: #00c853;
  box-shadow: 0 0 20px #00c853;
}

/* SLIDER */
.slider {
  position: absolute;
  right: -70px;
  top: 50%;
  transform: rotate(270deg);
  width: 220px;
}

/* BOTÃO */
button {
  background: #1FB5B5;
  color: white;
  border: none;
  padding: 14px 22px;
  border-radius: 25px;
  margin-top: 20px;
  font-size: 16px;
}

#resultado {
  font-size: 26px;
  margin-top: 15px;
  font-weight: bold;
}

#feedback {
  color: #00c853;
  font-weight: bold;
  display: none;
}

.dica {
  background: #fff3cd;
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  margin: 10px auto;
  max-width: 240px;
}
