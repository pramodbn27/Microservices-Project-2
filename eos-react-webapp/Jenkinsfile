def label = "eosagent"
def mvn_version = 'M2'
podTemplate(label: label, yaml: """
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: build
  annotations:
    sidecar.istio.io/inject: "false"
spec:
  containers:
  - name: build
    image: dpthub/eos-jenkins-agent-base:latest
    command:
    - cat
    tty: true
    volumeMounts:
    - name: dockersock
      mountPath: /var/run/docker.sock
  volumes:
  - name: dockersock
    hostPath:
      path: /var/run/docker.sock
"""
)  {
    node (label) {

        stage ('Checkout SCM'){
          git credentialsId: 'git', url: 'https://dptrealtime@bitbucket.org/dptrealtime/eos-react-webapp.git', branch: 'master'
          container('build') {
                stage('Build a React Webapp') {
                    sh 'CI=false npm run build'             
                }
            }
        }
        stage ('Docker Build'){
          container('build') {
                stage('Build Image') {
                    docker.withRegistry( 'https://registry.hub.docker.com', 'docker' ) {
                    def customImage = docker.build("dpthub/eos-react-webapp:latest")
                    customImage.push()             
                    }
                }
            }
        }
        stage ('Helm Chart') {
          container('build') {
            dir('charts') {
              withCredentials([usernamePassword(credentialsId: 'jfrog', usernameVariable: 'username', passwordVariable: 'password')]) {
              sh '/usr/local/bin/helm package webapp'
              sh '/usr/local/bin/helm push-artifactory webapp-1.0.tgz https://eosartifact.jfrog.io/artifactory/eos-helm-local  --username $username --password $password'
              }
            }
          }
       }
    }
}
