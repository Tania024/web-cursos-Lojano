document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const listaCursosDiv = document.getElementById("listaCursos");


     // Función para cargar los cursos desde localStorage
     function cargarCursos() {
        const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
        listaCursosDiv.innerHTML = ''; // Limpiar la lista antes de cargar
        cursos.forEach(curso => {
            const cursoDiv = document.createElement('div');
            
            cursoDiv.innerHTML = `
                <h3>${curso.nombreCurso}</h3>
                <p><strong>Instructor:</strong> ${curso.nombreInstructor}</p>
                <p><strong>Fecha de Inicio:</strong> ${curso.fechaInicio}</p>
                <p><strong>Duración:</strong> ${curso.duracion}</p>
                <button class="btnDetalles">Ver más detalles</button>
                <div class="detalles" style="display: none;"><p><strong>Descripción:</strong> ${curso.descripcion}</p>
                </div>
                <hr>
                

            `;
    
            const btnDetalles = cursoDiv.querySelector(".btnDetalles");
            const detalles = cursoDiv.querySelector(".detalles");

            btnDetalles.addEventListener("click", function () {
                if (detalles.style.display === "none" || detalles.style.display === "") {
                    detalles.style.display = "block";
                    btnDetalles.textContent = "Mostrar menos";
                } else {
                    detalles.style.display = "none";
                    btnDetalles.textContent = "Ver más detalles";
                }
            });
            
            listaCursosDiv.appendChild(cursoDiv);
        });
    }

    // Cargar los cursos al inicio
    cargarCursos();

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente



    // Obtener los valores de los campos del formulario
    const nombreCurso = document.getElementById("cname").value;
    const nombreInstructor = document.getElementById("iname").value;
    const fechaInicio = document.getElementById("fecha").value;
    const duracion = document.getElementById("duracion").value;
    const descripcion = document.getElementById("descripcion").value;

    // Validar que todos los campos estén completos
    if (!nombreCurso || !nombreInstructor || !fechaInicio || !duracion || !descripcion) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const curso = {
        nombreCurso,
        nombreInstructor,
        fechaInicio,
        duracion,
        descripcion
    };
    
    // Obtener cursos existentes o crear uno nuevo
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    cursos.push(curso); // Agregar el nuevo curso

    // Almacenar el nuevo array en localStorage
    localStorage.setItem('cursos', JSON.stringify(cursos));
    alert('¡Formulario enviado correctamente!');

    // Limpiar el formulario
    form.reset();

    // Volver a cargar la lista de cursos
    cargarCursos();
});
});

