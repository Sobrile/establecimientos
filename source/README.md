### EXPLICACION
# Instructivo Git ASI

La definición de los lineamientos tecnológicos en los estándares y procedimientos que reglamentan las políticas del Marco Normativo Tecnológico e IT, pueden ser encontrados en el siguiente  [LINK](https://asijira-confluence.buenosaires.gob.ar/download/attachments/19922971/Anexo%20Instructivo%20GIT.pdf).

Requerimientos
--------------

* Linux PWDevRhel7 3.10.0-229.14.1.el7.x86_64.
* Apache/2.4.34-7 (Red Hat Enterprise Linux)
* httpd-tools-2.4.6-67.el7.centos.2.x86_64
* httpd-2.4.6-67.el7.centos.2.x86_64


El proceso de instalacion se ejecuta con un comando ansible-playbook desde el directorio ansible:
### COMMANDO DE INSTALACIÓN

ansible-playbook -i ./inventory/hosts install.yml \
            -u root \
            -e dominio_front="{dominio_front}" \
            -e url_back="[url_back}" \
            -e env=dev \
            -e repository="git@git-asi.buenosaires.gob.ar:usuarioQA/asi-344-eval_desem_front.git" \
            -e folder="{folder_name}" \
            -e branch="git-branch" \
            -e branch="git-tag" \
            -e path="/var/www/html" \
            -e httpd_config="/etc/httpd/conf.d/front-evaluacion-master.conf" \
            -e httpd_daemon="httpd" \
            -v