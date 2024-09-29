document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const listaCursosDiv = document.getElementById("listaCursos");
    const buscarCursosInput = document.getElementById("buscarCursos");

    let cursoEditadoIndex = null;

     // Función para cargar los cursos desde localStorage
     function cargarCursos(filtro = "") {
        const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
        listaCursosDiv.innerHTML = ''; // Limpiar la lista antes de cargar

        const cursosFiltrados = cursos.filter(curso => 
            curso.nombreCurso.toLowerCase().includes(filtro.toLowerCase()) ||
            curso.nombreInstructor.toLowerCase().includes(filtro.toLowerCase())
        );
        
        if (cursosFiltrados.length === 0) {
            listaCursosDiv.innerHTML = '<p>No se encontraron cursos.</p>';
            return;
        }
        
        cursosFiltrados.forEach((curso, index) => {
            const cursoDiv = document.createElement('div');
            
            cursoDiv.innerHTML = `
                <h3>${curso.nombreCurso}</h3>
                <p><strong>Instructor:</strong> ${curso.nombreInstructor}</p>
                <p><strong>Fecha de Inicio:</strong> ${curso.fechaInicio}</p>
                <p><strong>Duración:</strong> ${curso.duracion}</p>
                <button class="btnDetalles">Ver más detalles</button>
                <button class="btnEditar">Editar</button>
                <button class="btnEliminar">Eliminar</button>
                <div class="detalles" style="display: none;"><p><strong>Descripción:</strong> ${curso.descripcion}</p>
                </div>
                <hr>
                

            `;
    
            const btnDetalles = cursoDiv.querySelector(".btnDetalles");
            const btnEditar = cursoDiv.querySelector(".btnEditar");
            const btnEliminar = cursoDiv.querySelector(".btnEliminar");
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

            // Función para eliminar curso
            btnEliminar.addEventListener("click", function () {
                if (confirm("¿Estás seguro de que quieres eliminar este curso?")) {
                    cursos.splice(index, 1);
                    localStorage.setItem('cursos', JSON.stringify(cursos));
                    cargarCursos(); // Recargar la lista de cursos
                }
            });

            // Función para editar curso
            btnEditar.addEventListener("click", function () {
                cursoEditadoIndex = index;
                document.getElementById("cname").value = curso.nombreCurso;
                document.getElementById("iname").value = curso.nombreInstructor;
                document.getElementById("fecha").value = curso.fechaInicio;
                document.getElementById("duracion").value = curso.duracion;
                document.getElementById("descripcion").value = curso.descripcion;
                window.scrollTo(0, document.getElementById("agregarCursos").offsetTop); // Llevar al formulario
            });
            
            listaCursosDiv.appendChild(cursoDiv);
        });
    }

    // Agregar un evento de búsqueda para filtrar los cursos en tiempo real
    buscarCursosInput.addEventListener('input', function() {
        const filtro = buscarCursosInput.value; 
        cargarCursos(filtro); // Volver a cargar los cursos aplicando el filtro
    });

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

    // Validar que la fecha de inicio no sea anterior al día actual
    const fechaActual = new Date().toISOString().split("T")[0];
    if (fechaInicio < fechaActual) {
        alert("La fecha de inicio no puede ser anterior a hoy.");
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
    const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

    if (cursoEditadoIndex !== null) {
        cursos[cursoEditadoIndex] = curso; // Editar el curso existente
        cursoEditadoIndex = null; // Resetear el índice de edición
    } else {
        cursos.push(curso); // Agregar un nuevo curso
    }
    
    // Almacenar el nuevo array en localStorage
    localStorage.setItem('cursos', JSON.stringify(cursos));
    alert('¡Formulario enviado correctamente!');

    // Limpiar el formulario
    form.reset();

    // Volver a cargar la lista de cursos
    cargarCursos();
});
});

