FROM openjdk:11-jre-slim

WORKDIR /usr/src/app

COPY run_java_code.java .

RUN javac run_java_code.java

CMD ["java", "run_java_code"]
