//const ACCESS_TOKEN ="ya29.a0Aa4xrXPvrY1oMKlVO0JOrxEt022XgNW65Ehra38AyPoi782ctna-p7hkGFKqsGzZ5a2T-Ji9j1O4QUAKhAck65a4pZu6s8QulCcgQV0VcQkdVQOeRFBv86It8yktJvn7PC_bCymDko1cvbEgSOp7H_g9nGq74AaCgYKATASARASFQEjDvL976q-NupiVLevCIQ67CX12g0165";

//const SHEET_ID = '1yqsG8wOfGvcfrAMRPVS-p51A8SF9Q3aeGQZcRycHtK8';

//Inicializamos la fecha a la fecha de hoy
document.getElementById("fecha").valueAsDate = new Date();

const DETALLEIN = document.getElementById("detalleIngresos");
const DETALLEOUT = document.getElementById("detalleEgresos");
const BOTON = document.getElementById("button");
const error = document.getElementById('error');
//Declaramos las variables para calcular el total de cada tabla
let totalIngreso = 0;
let totalEgreso = 0;
let diferencia = 0;
//Asignamos el valor inicial en 0 a cada span
const valor = document.getElementById("ingresoTotal");
const valorEgreso = document.getElementById("egresosTotal");
valor.textContent = totalIngreso;
valorEgreso.textContent = totalEgreso;

const valor1 = document.getElementById("total1");
const valor2 = document.getElementById("total2");
const valor3 = document.getElementById("total3");
valor3.textContent = diferencia;
/* Detectamos el click en el boton para agregar los datos 
 a la tabla correspondiente y hacer los calculos*/

BOTON.addEventListener("click", () => {
  //Capturamos los datos de los campos
  const medioPago = document.getElementById("medio-pago").value;
  const concepto = document.getElementById("concepto").value;
  const fecha = document.getElementById("fecha").value;
  const monto = document.getElementById("monto").value;

  //Creamos los elementos que iran dentro de la tabla.
  //La fila <tr>
  let tr = document.createElement("tr");
  //Las columnas de descripcion
  let tdDescripcion = document.createElement("td");
  let tdFecha = document.createElement("td");
  let tdMonto = document.createElement("td");

  if (concepto !== "" && monto !== "") {
    error.style.display = "none";
    if (medioPago === "ingreso") {
      totalIngreso = totalIngreso + parseInt(monto);

      valor.textContent = formatearNumero(totalIngreso);
      valor1.textContent = formatearNumero(totalIngreso);
      diferencia = parseInt(totalIngreso) - parseInt(totalEgreso);
      valor3.textContent = formatearNumero(diferencia);

      tdDescripcion.textContent = concepto;
      tdFecha.textContent = fecha;
      tdMonto.textContent = formatearNumero(monto);

      tr.appendChild(tdDescripcion);
      tr.appendChild(tdFecha);
      tr.appendChild(tdMonto);

      DETALLEIN.appendChild(tr);
      limpiar();
    }
    if (medioPago === "egreso") {
      totalEgreso = totalEgreso + parseInt(monto);

      valorEgreso.textContent = formatearNumero(totalEgreso);
      valor2.textContent = formatearNumero(totalEgreso);
      diferencia = parseInt(totalIngreso) - parseInt(totalEgreso);
      valor3.textContent = formatearNumero(diferencia);

      tdDescripcion.textContent = concepto;
      tdFecha.textContent = fecha;
      tdMonto.textContent = formatearNumero(monto);

      tr.appendChild(tdDescripcion);
      tr.appendChild(tdFecha);
      tr.appendChild(tdMonto);

      DETALLEOUT.appendChild(tr);
      limpiar();
    }
  } else {
    error.style.display = "block";
  }
});
//Funcion que agrega puntos cada unidad de mil.
function formatearNumero(numero) {
  return new Intl.NumberFormat("es-PY").format(numero);
}
//Funcion para limpiar los valores de los inputs y fehcas
function limpiar() {
  document.getElementById("concepto").value = "";
  document.getElementById("fecha").valueAsDate = new Date();
  document.getElementById("monto").value = "";
}

function onRegistrarGasto() {
  //Obtenemos los datos del formulario
  const medioPago = document.getElementById("medio-pago").value;
  const concepto = document.getElementById("concepto").value;
  const fecha = document.getElementById("fecha").value;
  const monto = document.getElementById("monto").value;

  //Creamos el JSON que espera nuestra API
  let data = {};

  let values = [];

  let fila = [medioPago, concepto, fecha, monto];

  values.push(fila);

  //Verificar que coincida con el nombre de la hoja de nuestro sheet
  data.range = "hojaGastos";

  data.majorDimension = "ROWS";
  data.values = values;

  //Invocamos al método POST de la API
  fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/hojaGastos:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(data),
    }
  ).then(function (response) {
    response.json().then(function (data) {});
  });

  //Limpiamos los campos del formulario para permitir cargar un nuevo gasto
  document.getElementById("concepto").value = "";
  document.getElementById("fecha").valueAsDate = new Date();
  document.getElementById("monto").value = "";
}
