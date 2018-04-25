node() {

  stage('Install Dependencies') {
    sh 'npm install'
  }

  stage('Lint') {
    sh 'npm run lint'
  }

  stage('Unit Test') {
    sh 'npm run test:docker'
  }

  stage('Build') {
    sh 'npm run build'
  }

  stage('E2E Test') {
    sh 'npm run e2e:docker'
  }

}
