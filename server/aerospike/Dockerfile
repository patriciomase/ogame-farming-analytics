FROM aerospike:latest

MAINTAINER Patricio Gabriel Maseda <pmaseda@devspark.com>

# Work from /aerospike
WORKDIR /opt/aerospike

RUN apt-get update -y 
RUN apt-get install -y python wget logrotate ca-certificates 
RUN wget "https://www.aerospike.com/artifacts/aerospike-tools/3.9.1/aerospike-tools-3.9.1-debian7.tgz" -O aerospike-tools.tgz

RUN mkdir /opt/aerospike/aerospike
RUN tar xzf /opt/aerospike/aerospike-tools.tgz --strip-components=1 -C aerospike 
RUN apt-get purge -y --auto-remove wget ca-certificates


RUN dpkg -i /opt/aerospike/aerospike/aerospike-tools-*.debian7.x86_64.deb
RUN rm -rf aerospike-tools.tgz aerospike /var/lib/apt/lists/*

ADD aerospike.conf /etc/aerospike/aerospike.conf

# Mount the Aerospike data directory
VOLUME ["/opt/aerospike/data"]

# Expose Aerospike ports
#
#   3000 – service port, for client connections
#   3001 – fabric port, for cluster communication
#   3002 – mesh port, for cluster heartbeat
#   3003 – info port
#
EXPOSE 3000 3001 3002 3003

# Execute the run script in foreground mode
CMD ["/usr/bin/asd","--foreground"]
