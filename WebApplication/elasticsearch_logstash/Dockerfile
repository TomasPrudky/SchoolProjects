# FROM docker.elastic.co/logstash/logstash:8.5.0
FROM logstash:8.5.0

# install dependency
RUN /usr/share/logstash/bin/logstash-plugin install logstash-input-jdbc
# RUN /usr/share/logstash/bin/logstash-plugin install logstash-filter-aggregate
# RUN /usr/share/logstash/bin/logstash-plugin install logstash-filter-jdbc_streaming
# RUN /usr/share/logstash/bin/logstash-plugin install logstash-filter-mutate

# copy lib database jdbc jars
RUN logstash-plugin install logstash-output-elasticsearch
COPY ./mysql-connector-java-8.0.30.jar /usr/share/logstash/logstash-core/lib/jars/mysql-connector-java.jar