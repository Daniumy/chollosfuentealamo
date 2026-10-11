pipeline {
  agent any

  environment {
    IMAGE       = 'europe-southwest1-docker.pkg.dev/chollos-fa-4821/chollos/web'
    GITOPS_REPO = 'github.com/Daniumy/chollosfuentealamo-gitops.git'
  }

  options {
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  stages {
    stage('Preparar') {
      steps {
        script {
          // El tag de la imagen = los 7 primeros caracteres del commit
          env.TAG = sh(script: 'git rev-parse --short=7 HEAD', returnStdout: true).trim()
        }
        echo "Rama ${env.BRANCH_NAME}, commit ${env.TAG}"
      }
    }

    stage('Lint') {
      steps {
        // La VM no tiene Node: usamos un contenedor de Node de usar y tirar
        sh '''
          docker run --rm -u "$(id -u):$(id -g)" -e HOME=/tmp \
            -v "$PWD":/app -w /app node:24-alpine \
            sh -c "npm ci && npm run lint"
        '''
      }
    }

    stage('Build imagen') {
      steps {
        sh 'docker build --build-arg APP_VERSION=$TAG -t $IMAGE:$TAG .'
      }
    }

    stage('Push imagen') {
      when { branch 'main' }
      steps {
        sh 'docker push $IMAGE:$TAG'
      }
    }

    stage('Deploy prod (GitOps)') {
      when { branch 'main' }
      steps {
        withCredentials([usernamePassword(credentialsId: 'github-gitops',
                                          usernameVariable: 'GH_USER',
                                          passwordVariable: 'GH_TOKEN')]) {
          sh '''
            rm -rf gitops
            git clone "https://$GH_USER:$GH_TOKEN@$GITOPS_REPO" gitops
            cd gitops
            sed -i "s|newTag: .*|newTag: $TAG|" app/overlays/prod/kustomization.yaml
            git config user.name "Jenkins"
            git config user.email "jenkins@chollosfuentealamo.com"
            git diff --quiet || { git commit -am "deploy(prod): web $TAG" && git push origin main; }
          '''
        }
      }
    }
  }

  post {
    always {
      sh 'docker image prune -f'    // que el disco de la VM no se llene
    }
  }
}