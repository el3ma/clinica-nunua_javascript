
let traumatologia = [
    {hora: "08:00", especialista: "MARIA PAZ ALTUZARRA", paciente:"PAULA SANCHEZ", rut:"15554774-5", prevision:"FONASA"},
    {hora: "10:00", especialista: "RAUL ARAYA", paciente:"ANGÉLICA NAVAS", rut:"15444147-9", prevision:"ISAPRE"},
    {hora: "10:30", especialista: "MARIA ARRIAGADA", paciente:"PANA KLAPP", rut:"17879423-9", prevision:"ISAPRE"},
    {hora: "11:00", especialista: "ALEJANDRO BADILL", paciente:"FELIPE MARDONES", rut:"1547423-6", prevision:"ISAPRE"},
    {hora: "11:30", especialista: "CECILIA BUDNIK", paciente:"DIEGO MARREZ", rut:"16554741-K", prevision:"FONASA"},
    {hora: "12:00", especialista: "ARTURO CAVAGNARO", paciente:"CECILIA MENDEZ", rut:"9747535-8", prevision:"ISAPRE"},
    {hora: "12:30", especialista: "ANDRES KANACRI", paciente:"MARCIAL SUAZO", rut:"11254785-5", prevision:"ISAPRE"}
];

let traumatologia2 = [
    {hora: "09:00", especialista: "RENÉ POBLETE", paciente:"ANA GELLONA", rut:"13123329-7", prevision:"ISAPRE"},
    {hora: "09:30", especialista: "MARIA SOLAR", paciente:"RAMIRO ANDRADE", rut:"12221451-K", prevision:"FONASA"},
    {hora: "10:00", especialista: "RAUL LOYOLA", paciente:"CARMEN ISLA", rut:"10112348-3", prevision:"ISAPRE"},
    {hora: "10:30", especialista: "ANTONIO LARENAS", paciente:"PABLO LOAYZA ", rut:"13453234-1", prevision:"ISAPRE"},
    {hora: "12:00", especialista: "MATIAS ARAVENA", paciente:"SUSANA POBLETE", rut:"14345656-6", prevision:"FONASA"}
];

let radiologia =[
    {hora: "11:00", especialista: "IGNACIO SCHULZ", paciente:"FRANCISCA ROJAS", rut:"9878782-1", prevision:"FONASA"},
    {hora: "11:30", especialista: "FEDERICO SUBERCASEAUX", paciente:"PAMELA ESTRADA", rut:"15345241-3", prevision:"ISAPRE"},
    {hora: "15:00", especialista: "FERNANDO WURTHZ", paciente:"ARMANDO LUNA", rut:"16445345-9", prevision:"ISAPRE"},
    {hora: "15:30", especialista: "ANA MARIA GODOY", paciente:"MANUEL GODOY", rut:"17666419-0", prevision:"FONASA"},
    {hora: "16:00", especialista: "PATRICIA SUAZO", paciente:"RAMON ULLOA", rut:"14989389-K", prevision:"FONASA"}
];

let dental = [
    {hora: "08:30", especialista: "ANDREA ZUÑIGA", paciente:"MARCELA RETAMAL", rut:"11123425-6", prevision:"ISAPRE"},
    {hora: "11:00", especialista: "MARIA PIA ZAÑARTU", paciente:"ANGEL MUÑOZ", rut:"9878789-2", prevision:"ISAPRE"},
    {hora: "11:30", especialista: "SCARLETT WITTING", paciente:"MARIO KAST", rut:"7998789-5", prevision:"FONASA"},
    {hora: "13:00", especialista: "FRANCISCO VON TEUBER", paciente:"KARIN FERNANDEZ", rut:"18887662-K", prevision:"FONASA"},
    {hora: "13:30", especialista: "EDUARDO VIÑUELA", paciente:"HUGO SANCHEZ", rut:"17665461-4", prevision:"FONASA"},
    {hora: "14:00", especialista: "RAQUEL VILLASECA", paciente:"ANA SEPULVEDA", rut:"14441281-0", prevision:"FONASA"}
];

let listaCompleta = traumatologia.concat(radiologia, dental, traumatologia2);

function main(){
    listaRad("tablaRad", radiologia);
    listaTra("tablaTra", traumatologia);
    listaDen("parrafoDent", dental);
    llenarTabla("tablaHoras", listaCompleta);
}

main();

function copiaObjeto(objeto){
    return JSON.parse(JSON.stringify(objeto));
}

function listaRad(tablaId, listado){
    let copiaRad = copiaObjeto(listado);
    copiaRad.shift();
    copiaRad.pop();
    let infoRad = document.getElementById("atencionRad");
    infoRad.innerText = `Primera atención: ${copiaRad[0].paciente} - ${copiaRad[0].prevision} | Última atención: ${copiaRad[copiaRad.length-1].paciente} - ${copiaRad[copiaRad.length-1].prevision}`;
    ordenAtencion(copiaRad);
    llenarTabla(tablaId, copiaRad);
}

function listaTra(tablaId,listado){
    let nuevoListado = copiaObjeto(listado);
    nuevoListado = nuevoListado.concat(traumatologia2);
    nuevoListado = ordenAtencion(nuevoListado);
    let infoTra = document.getElementById("atencionTra");
    infoTra.innerText = `Primera atención: ${nuevoListado[0].paciente} - ${nuevoListado[0].prevision} | Última atención: ${nuevoListado[nuevoListado.length-1].paciente} - ${nuevoListado[nuevoListado.length-1].prevision}`;
    llenarTabla(tablaId, nuevoListado);
    filtrarPrevision(nuevoListado, "FONASA", "fonasaTra")
}

function listaDen(parrafoId, listado){
    llenarParrafos(parrafoId, listado)
    let infoDen = document.getElementById("atencionDen");
    infoDen.innerText = `Primera atención: ${dental[0].paciente} - ${dental[0].prevision} | Última atención: ${dental[dental.length-1].paciente} - ${dental[dental.length-1].prevision}`;
    filtrarPrevision(dental, "ISAPRE","isapreDent")
}

function llenarParrafos(parrafoId, listado){
    let cuerpoParrafo = document.getElementById(parrafoId);
    let parrafo = "";
    for (const atencion of listado) {
        parrafo += `${Object.values(atencion).join(" - ")}
         `;
    }
    cuerpoParrafo.innerText = parrafo;
}

function obtenerEspecialidad(atencion) {
    if (traumatologia.includes(atencion)) {
        return "Traumatología";
    } else if (radiologia.includes(atencion)) {
        return "Radiología";
    } else if (dental.includes(atencion)) {
        return "Dental";
    }
    return "Especialidad no encontrada";
}

function llenarTabla(tablaId, listado){
    ordenAtencion(listado);
    let cuerpoTabla = document.querySelector(`#${tablaId} tbody`);
    let filasTabla = "";
    for (const atencion of listado) {
        /* const especialidad = obtenerEspecialidad(atencion); */

        filasTabla += `
        <tr>
            <th scope="row">${atencion.hora}</th>
            <td>${atencion.especialista}</td>
            <td>${atencion.paciente}</td>
            <td>${atencion.rut}</td>
            <td>${atencion.prevision}</td>
            
        </tr>`;
    }
    cuerpoTabla.innerHTML = filasTabla;
}

function ordenAtencion(listado){
    return listado.sort(function(a, b){
        if(a.hora > b.hora){
            return 1;
        }
    
        if (a.hora < b.hora){
            return -1;
        }
    
        return 0;
    });
}

function filtrarPrevision(listado, prevision, parrafoId){
    let cuerpoParrafo = document.getElementById(parrafoId);
    let parrafo = "";
    let resultado = listado.filter(atencion => atencion.prevision == prevision);
    for (const atencion of resultado) {
        parrafo += `-${atencion.paciente} - ${atencion.prevision}
         `;
    }
    cuerpoParrafo.innerText = parrafo; 
}