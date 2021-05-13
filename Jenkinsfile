pipeline {
  agent any
  stages {
    stage('Install Dependencies') {
      steps {
        sh 'pwd'
        sh 'ls -al'
        nodejs(nodeJSInstallationName: 'nodejs') {
            sh 'npm install'
        }
      }
    }
    stage('Start Dev Server'){
      when { branch 'jenkins' }
      steps{
        nodejs(nodeJSInstallationName: 'nodejs'){
          sh 'npm start'
        }
      }
    }
  }
}