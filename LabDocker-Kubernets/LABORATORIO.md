# Laboratorio: Docker Compose, App Web en Contenedor y Orquestación con Kubernetes

Este laboratorio te guía de menor a mayor: primero entenderás los componentes de Docker Compose, luego lo aplicarás para desplegar una app web mínima en contenedor, y finalmente verás los fundamentos de la orquestación con Kubernetes con un ejemplo práctico.

## Objetivos
- Comprender los componentes clave de Docker Compose y sus comandos esenciales.
- Construir y ejecutar una aplicación web mínima en Docker usando Compose.
- Entender los conceptos principales de Kubernetes (orquestación) y aplicar manifiestos de Deployment y Service.

## Requisitos previos
- Windows con Docker Desktop instalado y ejecutándose.
- PowerShell (por defecto en Windows).
- Para la parte de Kubernetes, disponer de un clúster (Docker Desktop con Kubernetes habilitado, Minikube o kind). Si no tienes Kubernetes aún, puedes completar las partes de Compose y App Web.

## Estructura del proyecto
En la carpeta `lab` se han creado estos archivos:
- `lab/Dockerfile`: Construcción de la imagen Python + Flask.
- `lab/requirements.txt`: Dependencias de la app.
- `lab/app.py`: App web Flask con rutas `/` y `/info`.
- `lab/docker-compose.yml`: Definición del servicio web.
- `lab/k8s/deployment.yaml`: Deployment de Kubernetes con probes.
- `lab/k8s/service.yaml`: Service de Kubernetes tipo NodePort.

---

## Parte 1 — Docker Compose: componentes y comandos

### ¿Qué es Docker Compose?
Herramienta para definir y ejecutar aplicaciones multi-contenedor con un archivo YAML. Permite levantar, parar, escalar y conectar servicios de forma declarativa.

### Componentes clave del archivo `docker-compose.yml`
- `services`: Lista de servicios/contendores. Cada servicio incluye su configuración.
- `build`: Cómo construir la imagen desde un `Dockerfile`.
- `image`: Nombre/tag de imagen (opcional si usas `build`).
- `ports`: Mapeos `host:contenedor` para exponer la app.
- `environment`: Variables de entorno.
- `restart`: Política de reinicio (por ejemplo, `unless-stopped`).
- (Opcionales) `networks` y `volumes`: comunicación y persistencia.

### Comandos básicos de Compose
- Construir imágenes: `docker compose build`
- Levantar servicios: `docker compose up` (usa `-d` para modo detach)
- Detener/limpiar: `docker compose down`
- Inspección: `docker compose ps`, `docker compose logs -f <servicio>`
- Ejecutar dentro del contenedor: `docker compose exec <servicio> sh`
- Escalar un servicio: `docker compose up --scale web=3`

---

## Parte 2 — App Web mínima en contenedor (Flask)

### Código de la app
- `app.py` expone:
  - `/`: devuelve un texto de bienvenida.
  - `/info`: devuelve JSON con `status="ok"` para pruebas de salud.

### Imagen de contenedor
- `Dockerfile` usa `python:3.11-slim`, instala dependencias y ejecuta Flask en el puerto `5000`.

### Definición en Docker Compose
- `docker-compose.yml` define el servicio `web` (build, puertos, variables y política de restart), exponiendo `5000:5000`.

### Pasos de ejecución
1. Abre PowerShell en `c:\Users\notebook\Desktop\LabDocker-Kubernets\lab`.
2. Ejecuta: `docker compose up --build`
3. Prueba en el navegador:
   - `http://localhost:5000/` → “Hola desde Flask en Docker Compose!”
   - `http://localhost:5000/info` → JSON con `status: ok`
4. Logs y gestión:
   - `docker compose logs -f web`
   - `docker compose exec web sh`
   - `docker compose down` para limpiar el entorno.

> Nota: Si ves errores del tipo “cannot find the file //./pipe/dockerDesktopLinuxEngine”, asegúrate de que Docker Desktop esté corriendo y vuelve a ejecutar el comando.

---

## Parte 3.1 — Implementación real en Kubernetes (paso a paso y evidencia)

A continuación se documentan los comandos ejecutados y los resultados obtenidos durante la implementación en Kubernetes.

1) Confirmar el contexto y estado del clúster
- `kubectl config current-context` → `docker-desktop`
- `kubectl get nodes` → Nodo `docker-desktop` en estado `Ready` (v1.34.1)

2) Aplicar los manifiestos del laboratorio
- `kubectl apply -f lab/k8s/deployment.yaml`
- `kubectl apply -f lab/k8s/service.yaml`

3) Esperar a que los Pods estén listos
- `kubectl wait --for=condition=ready pod -l app=flask-web --timeout=120s`

4) Verificar recursos desplegados
- `kubectl get deployments,pods,services -o wide` → `deployment/flask-web` con 2 réplicas; `pod/flask-web-...` en `Running`; `service/flask-web` de tipo `NodePort` en `5000:30080/TCP`.

5) Probar el servicio
- `curl http://localhost:30080/info` → Respuesta `200 OK` con cuerpo `{"app":"flask-docker-lab","status":"ok"}`.

Observaciones
- El `Deployment` usa la imagen local `lab-web:latest` y define `livenessProbe`/`readinessProbe` sobre `/info`.
- El `Service` es `NodePort` (30080). En Docker Desktop, `http://localhost:30080/` funciona; en otros clústeres usa `http://<NodeIP>:30080/`.

6) Actualización de imagen a v2 (ejemplo práctico)
- Reconstruir y etiquetar la imagen local:
  - `docker build -t lab-web:v2 lab`
- Actualizar el Deployment con el nuevo tag y esperar el rollout:
  - `kubectl set image deployment/flask-web flask-web=lab-web:v2`
  - `kubectl rollout status deployment/flask-web`
- Verificación de versión y estado tras el despliegue:
  - `kubectl get deployments,pods,svc -o wide`
  - PowerShell: `(Invoke-WebRequest -UseBasicParsing -Uri http://localhost:30080/info).Content` → debe incluir `"version":"v2"`

### Usar tu clúster kubeadm
Si levantaste un clúster `kubeadm` y quieres desplegar allí:

1) Cambiar contexto
- Listar contextos: `kubectl config get-contexts`
- Usar contexto kubeadm: `kubectl config use-context <nombre-del-contexto-kubeadm>`

2) Garantizar disponibilidad de la imagen `lab-web:latest` en los nodos
- Opción A (registro): Subir la imagen a un registro y referenciarla en el `Deployment`.
  - Construir/taggear: `docker tag lab-web:latest <REGISTRO>/<NAMESPACE>/lab-web:latest`
  - Push: `docker push <REGISTRO>/<NAMESPACE>/lab-web:latest`
  - Actualizar `deployment.yaml` en `image:` con la ruta del registro y aplicar de nuevo.
- Opción B (cargar en nodos kubeadm):
  - Exportar: `docker save lab-web:latest -o lab-web.tar`
  - Copiar `lab-web.tar` a cada nodo.
  - Importar (containerd): `ctr -n k8s.io images import lab-web.tar`
  - Verificar: `ctr -n k8s.io images ls | findstr lab-web`
- Opción C (Minikube, si aplicara): `minikube image load lab-web:latest`

3) Aplicar manifiestos en kubeadm
- `kubectl apply -f lab/k8s/deployment.yaml`
- `kubectl apply -f lab/k8s/service.yaml`

4) Probar el acceso
- Obtener IP del nodo: `kubectl get nodes -o wide`
- Navegador: `http://<NodeIP>:30080/` y `http://<NodeIP>:30080/info`
- Alternativa universal: `kubectl port-forward service/flask-web 5000:5000` y luego `http://localhost:5000/`
- ### Parte 3.2 — Ingress NGINX: instalación, aplicación y pruebas
1) Instalación del NGINX Ingress Controller (bare metal / kubeadm)
- Comando ejecutado:
  - kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/baremetal/deploy.yaml
- Recursos creados (salida abreviada):
  - namespace/ingress-nginx, service/ingress-nginx-controller (NodePort), deployment.apps/ingress-nginx-controller, jobs de admisión, IngressClass 'nginx'.
- Verificación de readiness:
  - kubectl -n ingress-nginx wait --for=condition=ready pod -l app.kubernetes.io/component=controller --timeout=180s
  - Resultado: pod/ingress-nginx-controller ... condition met (Running 1/1)

2) Manifiesto Ingress para la aplicación flask-web
- Archivo creado: lab/k8s/ingress.yaml
- Contenido relevante:
  - spec.ingressClassName: nginx
  - Regla / y /info (pathType: Prefix) apuntando a service flask-web:5000
- Aplicación del manifiesto:
  - kubectl apply -f lab/k8s/ingress.yaml
- Verificación de recurso:
  - kubectl get ingress flask-web -o wide
  - Salida: CLASS=nginx, HOSTS=*, PORTS=80

3) Pruebas de acceso vía Ingress Controller (NodePort)
- Obtener NodePort del controlador:
  - kubectl -n ingress-nginx get svc ingress-nginx-controller -o wide
  - Ejemplo de salida: 80:32342/TCP, 443:31594/TCP
- Prueba de la ruta /info:
  - PowerShell: (Invoke-WebRequest -UseBasicParsing -Uri http://localhost:32342/info).Content
  - Resultado: {"app":"flask-docker-lab","status":"ok","version":"v2"}
- Prueba de la ruta raíz /:
  - PowerShell: (Invoke-WebRequest -UseBasicParsing -Uri http://localhost:32342/).Content
  - Resultado: "Hola desde Flask v2 en Docker/Kubernetes!"

4) Host dedicado flask.lab.local (pruebas y configuración de hosts)
- Actualización del Ingress para usar host:
  - Archivo: lab/k8s/ingress.yaml
  - Cambios: agregar `rules[].host: flask.lab.local` manteniendo `pathType: Prefix` para `/` y `/info`.
- Aplicar y verificar:
  - `kubectl apply -f lab/k8s/ingress.yaml`
  - `kubectl get ingress flask-web -o wide` → HOSTS=flask.lab.local
- Probar acceso enviando la cabecera Host (sin editar hosts aún):
  - PowerShell: `$port = (kubectl -n ingress-nginx get svc ingress-nginx-controller -o jsonpath="{.spec.ports[?(@.port==80)].nodePort}"); (Invoke-WebRequest -UseBasicParsing -Uri http://localhost:$port/info -Headers @{ Host = 'flask.lab.local' }).Content`
  - Resultado: `{"app":"flask-docker-lab","status":"ok","version":"v2"}`
  - PowerShell (ruta raíz): `(Invoke-WebRequest -UseBasicParsing -Uri http://localhost:$port/ -Headers @{ Host = 'flask.lab.local' }).Content` → `Hola desde Flask v2 en Docker/Kubernetes!`
- (Opcional) Editar archivo hosts del sistema para usar el nombre sin cabecera manual:
  - Abrir como administrador: `C:\Windows\System32\drivers\etc\hosts`
  - Añadir línea: `127.0.0.1    flask.lab.local`
  - Probar en navegador: `http://flask.lab.local/` y `http://flask.lab.local/info` (si tu entorno resuelve al NodePort; en Docker Desktop suele funcionar con localhost; con kubeadm usa IP del nodo)

5) Notas de resolución de incidencias
- Se eliminó un Ingress previo con path inválido (/()) y anotación de rewrite para reaplicar uno corregido.
- El webhook de validación (ingress-nginx-admission) puede rechazar peticiones si no está disponible; se recomienda esperar readiness del controlador antes de aplicar Ingress.

6) Limpieza (opcional)
- kubectl delete ingress flask-web
- Actualizar imagen: `kubectl set image deployment/flask-web flask-web=<REGISTRO>/<NAMESPACE>/lab-web:<tag>` y `kubectl rollout status deployment/flask-web`

6) Limpieza
- `kubectl delete -f lab/k8s`
- (Opcional) Parar entorno local: `docker compose down`

### ¿Qué es la orquestación?
Administración del ciclo de vida de contenedores a escala: despliegue, escalado, auto-recuperación, configuración, red, actualización y observabilidad. Kubernetes es el orquestador más usado.

### Concepto: TLS (Transport Layer Security)
TLS es un protocolo criptográfico que protege las comunicaciones en red aportando:
- Confidencialidad: cifra el tráfico para que no pueda ser leído por terceros.
- Integridad: detecta modificaciones en el contenido durante el transporte.
- Autenticación del servidor: el cliente verifica que se conecta al servidor legítimo mediante certificados.

Puntos clave:
- HTTPS es HTTP sobre TLS (normalmente en el puerto 443).
- Los certificados X.509 (emitidos por una CA o self-signed) contienen la identidad del servidor (CN/SAN), su clave pública y la cadena de confianza.
- SNI (Server Name Indication) permite que un mismo endpoint sirva múltiples nombres de host con certificados distintos.
- El handshake de TLS negocia versiones/cifrados, verifica certificados y establece claves de sesión para cifrar el canal.

TLS en Kubernetes con Ingress NGINX:
- Terminación TLS: el Ingress Controller (Nginx) descifra el tráfico HTTPS en el borde y comunica con los servicios internos normalmente vía HTTP.
- Secret TLS: se crea un Secret de tipo `kubernetes.io/tls` con `tls.crt` (certificado) y `tls.key` (clave privada).
- Configuración en Ingress: se añade `spec.tls` con la lista de hosts y `secretName` apuntando al Secret TLS.
- Certificados self-signed sirven para pruebas (el navegador mostrará advertencias); en producción se recomienda usar una CA reconocida (por ejemplo, Let’s Encrypt con cert-manager).


### Componentes clave de Kubernetes
- `Cluster` y `Nodes`: infraestructura del clúster.
- `Pod`: unidad mínima de despliegue (uno o varios contenedores).
- `Deployment`: gestiona réplicas, actualizaciones y rollbacks (crea `ReplicaSets`).
- `Service`: expone Pods de forma estable (tipos: `ClusterIP`, `NodePort`, `LoadBalancer`).
- `Ingress`: entrada HTTP/HTTPS avanzada con reglas y hostnames.
- `ConfigMap` / `Secret`: configuración y credenciales.
- `Probes` (`liveness`/`readiness`): salud y disponibilidad de contenedores.

### Comandos básicos con `kubectl`
- Aplicar manifiestos: `kubectl apply -f <archivo.yaml>`
- Listar/inspeccionar: `kubectl get ...`, `kubectl describe ...`
- Logs/exec: `kubectl logs <pod>`, `kubectl exec -it <pod> -- sh`
- Exponer localmente: `kubectl port-forward service/<svc> 5000:5000`
- Escalar despliegues: `kubectl scale deployment <name> --replicas=<n>`
- Actualizaciones/control: `kubectl rollout status`, `kubectl set image ...`
- Limpieza: `kubectl delete -f <ruta>`

### Ejemplo práctico (usando los manifiestos incluidos)
1. Construye la imagen local con Compose (Paso de la Parte 2).
2. Aplica los manifiestos:
   - En `lab/k8s`: `kubectl apply -f deployment.yaml`
   - En `lab/k8s`: `kubectl apply -f service.yaml`
3. Verifica:
   - `kubectl get deployments,pods,services`
   - Espera que los Pods estén en `Running`.
4. Prueba la app:
   - Port-forward: `kubectl port-forward service/flask-web 5000:5000`
   - Abre `http://localhost:5000/` y `http://localhost:5000/info`
   - Alternativa con `NodePort` (si aplica): `http://localhost:30080/`
5. Escala:
   - `kubectl scale deployment flask-web --replicas=4`
   - `kubectl get pods` para ver más réplicas.
6. Actualiza versión:
   - Reconstruye la imagen con nuevo tag y actualiza el `Deployment` (campo `image` o comando `set image`).
7. Limpieza:
   - `kubectl delete -f lab/k8s`

### Diferencias Compose vs Kubernetes
- Compose: desarrollo/local, apps simples multi-contenedor. Fácil y rápido.
- Kubernetes: producción y alta disponibilidad. Escalado, autorecuperación, actualizaciones controladas, observabilidad, etc.

---

## Extensiones sugeridas
- Sustituir Flask por Nginx (estático) o Django.
- Añadir base de datos (Postgres) con volumen en Compose y PVC/PV en Kubernetes.
- Añadir Ingress y TLS para exposición HTTP/HTTPS en Kubernetes.
- Definir `resources` (requests/limits), aplicar HPA (autoscaling) y mejorar `probes`.

## Troubleshooting rápido
- Docker no responde: abre Docker Desktop y espera a que indique “Running”.
- Error sobre clave `version` en Compose: esa clave es obsoleta en Compose v2, puede omitirse.
- `NodePort` inaccesible: usa `kubectl port-forward` como método universal.
- Permisos/WSL: asegúrate de tener virtualización habilitada y permisos de redeo adecuados.

¡Listo! Con este laboratorio tienes un flujo completo desde desarrollo local con Compose hasta despliegue y gestión básica con Kubernetes.